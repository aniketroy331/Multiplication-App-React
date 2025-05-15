import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/FlappyBird.css';

const FlappyBird = ({ onBackToDashboard }) => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const BIRD_WIDTH = 40;
  const BIRD_HEIGHT = 30;
  const PIPE_WIDTH = 5;
  const PIPE_GAP = 150;
  const PIPE_SPEED = 3;
  const PIPE_FREQUENCY = 2500;
  const GRAVITY = 0.5;
  const JUMP_FORCE = -10;
  const birdRef = useRef({
    x: 100,
    y: 0,
    width: BIRD_WIDTH,
    height: BIRD_HEIGHT,
    velocity: 0
  });

  const pipesRef = useRef([]);
  const lastPipeTimeRef = useRef(0);
  const animationIdRef = useRef(null);
  const pipeSpeedRef = useRef(PIPE_SPEED);
  const pipeFrequencyRef = useRef(PIPE_FREQUENCY);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth > 400 ? 400 : window.innerWidth;
      canvas.height = 600;
      birdRef.current.y = canvas.height / 2;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationIdRef.current);
    };
  }, []);
  const gameLoop = (timestamp) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const bird = birdRef.current;
    const pipes = pipesRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bird.velocity += GRAVITY;
    bird.y += bird.velocity;
    
    if (bird.y + bird.height > canvas.height || bird.y < 0) {
      endGame();
      return;
    }
    
    if (timestamp - lastPipeTimeRef.current > pipeFrequencyRef.current) {
      createPipe(canvas.height);
      lastPipeTimeRef.current = timestamp;
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].x -= pipeSpeedRef.current;
      

      if (checkCollision(bird, pipes[i])) {
        endGame();
        return;
      }
      if (!pipes[i].passed && bird.x > pipes[i].x + PIPE_WIDTH) {
        pipes[i].passed = true;
        setScore(prev => prev + 1);
        if ((score + 1) % 5 === 0) {
          pipeSpeedRef.current += 0.5;
          pipeFrequencyRef.current = Math.max(1500, pipeFrequencyRef.current - 100);
        }
      }
      if (pipes[i].x + PIPE_WIDTH < 0) {
        pipes.splice(i, 1);
      } else {
        drawPipe(ctx, pipes[i]);
      }
    }
    drawBird(ctx, bird);
    animationIdRef.current = requestAnimationFrame(gameLoop);
  };

  // Create a new pipe
  const createPipe = (canvasHeight) => {
    const minHeight = 50;
    const maxHeight = canvasHeight - PIPE_GAP - minHeight;
    const topHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
    
    pipesRef.current.push({
      x: canvasRef.current.width,
      topHeight: topHeight,
      passed: false
    });
  };

  // Draw pipe on canvas
  const drawPipe = (ctx, pipe) => {
// top 
    ctx.fillStyle = '#6bbd3a';
    ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
    
    // Bottom 
    const bottomY = pipe.topHeight + PIPE_GAP;
    ctx.fillRect(pipe.x, bottomY, PIPE_WIDTH, ctx.canvas.height - bottomY);
  };

  // canvas bird
  const drawBird = (ctx, bird) => {
    ctx.fillStyle = '#f8d347';
    
    // bird shape
    ctx.beginPath();
    ctx.arc(bird.x + bird.width/2, bird.y + bird.height/2, bird.width/2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(bird.x + bird.width/2 + 5, bird.y + bird.height/2 - 5, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(bird.x + bird.width/2 + 5, bird.y + bird.height/2 - 5, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f8a413';
    ctx.beginPath();
    ctx.moveTo(bird.x + bird.width, bird.y + bird.height/2);
    ctx.lineTo(bird.x + bird.width + 15, bird.y + bird.height/2);
    ctx.lineTo(bird.x + bird.width, bird.y + bird.height/2 + 5);
    ctx.fill();
  };

  // Check collision between bird and pipe
  const checkCollision = (bird, pipe) => {
    if (bird.x + bird.width < pipe.x) return false;
    if (bird.x > pipe.x + PIPE_WIDTH) return false;
    if (bird.y < pipe.topHeight || bird.y + bird.height > pipe.topHeight + PIPE_GAP) {
      return true;
    }
    return false;
  };

  // jump action
  const handleJump = () => {
    if (gameStarted && !gameOver) {
      birdRef.current.velocity = JUMP_FORCE;
    }
  };

  // Start the game
  const startGame = () => {
    // Reset game state
    birdRef.current = {
      x: 100,
      y: canvasRef.current.height / 2,
      width: BIRD_WIDTH,
      height: BIRD_HEIGHT,
      velocity: 0
    };
    pipesRef.current = [];
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
    pipeSpeedRef.current = PIPE_SPEED;
    pipeFrequencyRef.current = PIPE_FREQUENCY;
    
    // game loop
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }
    animationIdRef.current = requestAnimationFrame(gameLoop);
  };

  // End the game
  const endGame = () => {
    setGameOver(true);
    setGameStarted(false);
    cancelAnimationFrame(animationIdRef.current);
  };
// for key 
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' || e.key === ' ') {
        handleJump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, gameOver]);

  const navigate = useNavigate();
  return (
    <div className="flappy-bird-container">
      <canvas 
        ref={canvasRef} 
        onClick={handleJump}
        onTouchStart={handleJump}
      />
      
      {!gameStarted && !gameOver && (
        <div className="start-screen">
          <h1>Flappy Bird</h1>
          <button className="start-button" onClick={startGame}>
            Start Game
          </button>
          <div className="instructions">
            Desktop: Press UP ARROW to flap<br />
            Mobile: Tap screen to flap
          </div>
        </div>
      )}
      
      {gameStarted && (
        <div className="score-display">{score}</div>
      )}
      
      {gameOver && (
        <div className="game-over">
          <h1>Game Over!</h1>
          <p>Your score: {score}</p>
          <button className="back-button" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default FlappyBird;