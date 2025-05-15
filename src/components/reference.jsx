import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import '../css/reference.css';
import step1 from '../videos/step1.mp4';
import step2 from '../videos/step2.mp4';
import step3 from '../videos/step3.mp4';
import step4 from '../videos/step4.mp4';
import step5 from '../videos/step5.mp4';
import step6 from '../videos/step6.mp4';
import step7 from '../videos/step7.mp4';
import step8 from '../videos/step8.mp4';
import step9 from '../videos/step9.mp4';
const VideoPlayerApp = () => {
  const staticVideos = [
    {
      _id: 'static-1',
      title: "Single Digit x 9",
      description: `suppose 8*9=72
      step-1: 10-8(users input) = 2(put it in unit place)
      step-2: users input 8-1 = 7 (put it in ten's place)
      formula:
      10 * (ten's place digit)7+ unit place digit = Answer(72)`,
      videoUrl: step1
    },
    {
      _id: 'static-2',
      title: "Double Digit x 9",
      description: `suppose the number is 78
      this is 8 is unit place digit and 7 is in ten's place digit!
      Step 1: Subtract unit place digit from 10: 10 - 8 =2 (unit place)
       Step 2: Add 9 to unit place digit and subtract tens place digit: 9 + 8 - 7 =10 (Tens Place).
       Step 3: Subtract 1 from tens place digit: 7-1=6 (Hundred place).
       Formula: 100 * 6 + 10 *  10  + 2 =702`,
      videoUrl: step2
    },
    {
      _id: 'static-3',
      title: "Triple Digit x 9",
      description: `Let's assume the number is 765, so:

    a = 7 (hundreds place)
    b = 6 (tens place)
    c = 5 (units place)
    Now plug the values into the steps:

    Step 1: Subtract the unit digit from 10
      → 10 - 5 = 5 (unit place)
    Step 2: Add 9 to the unit digit and subtract the tens digit
      → 9 + 5 - 6 = 8 (tens place)
    Step 3: Add 9 to the tens digit and subtract the hundreds digit
      → 9 + 6 - 7 = 8 (hundreds place)
    Step 4: Subtract 1 from the hundreds digit
      → 7 - 1 = 6 (thousands place)
    Final Result:
      → 1000 × 6 + 100 × 8 + 10 × 8 + 5 = 6000 + 800 + 80 + 5 = 6885`,
      videoUrl: step3
    },
    {
      _id: 'static-4',
      title: "Single Digit x 99",
      description: `let's a = 9;
      step1 = 10 - a(9);       
      step2 = 9;            
      step3 = 1 - 1;        
      finalResult = 100 * 8 + 10 * 9 + 1 = 800 + 90 + 1 = 891`,
      videoUrl: step4
    },
    {
      _id: 'static-5',
      title: "Double Digit x 99",
      description: `Step 1: 10 - 2 = 8 (unit place)
      Step 2: Always 9 (tens place)
      Step 3: 2 - 1 = 1 (hundreds place)
      Final result: 100 * 1 + 10 * 9 + 8 = 100 + 90 + 8 = 198
      So, 22 × 9 = 198`,
      videoUrl: step5
    },
    {
      _id: 'static-6',
      title: "Triple Digit x 99",
      description: `Step 1: Subtract the unit digit from 10 → 10 - 5 = 5 (unit place)
      Step 2: Subtract the tens digit from 9 → 9 - 4 = 5 (tens place)
      Step 3: Subtract 1 from the unit digit → 5 - 1 = 4 (hundreds place)
      Step 4: Take the tens digit as is → 4 (thousands place)
      Final Result:
      → 1000 × 4 + 100 × 4 + 10 × 5 + 5 = 4000 + 400 + 50 + 5 = 4455`,
      videoUrl: step6
    },
    {
      _id: 'static-7',
      title: "DSingle Digit x 999",
      description: `Step 1: Subtract the unit digit from 10 → 10 - 6 = 4 (unit place)
      Step 2: Subtract the tens digit from 9 → 9 - 5 = 4 (tens place)
      Step 3: Add 9 to the unit digit and subtract the hundreds digit → 9 + 6 - 4 = 11 (hundreds place)
      Step 4: Subtract 1 from the tens digit → 5 - 1 = 4 (thousands place)
      Step 5: Take the hundreds digit as is → 4 (ten-thousands place)
      Final Result:
      → 10000 × 4 + 1000 × 4 + 100 × 11 + 10 × 4 + 4 =
      → 40000 + 4000 + 1100 + 40 + 4 = 45144`,
      videoUrl: step7
    },
    {
      _id: 'static-8',
      title: "Double Digit x 999",
      description: `Step 1: Subtract the unit digit from 10 → 10 - 3 = 7 (unit place)
      Step 2: Use 9 as the tens place → 9
      Step 3: Use another 9 as the hundreds place → 9
      Step 4: Subtract 1 from the unit digit → 3 - 1 = 2 (thousands place)
      Final Result:
      → 1000 × 2 + 100 × 9 + 10 × 9 + 7 =
      → 2000 + 900 + 90 + 7 = 2997`,
      videoUrl: step8
    },
    {
      _id: 'static-9',
      title: "Triple Digit x 999",
      description: `Step 1: Subtract the unit digit from 10 → 10 - 3 = 7 (unit place)
      Step 2: Subtract the tens digit from 9 → 9 - 2 = 7 (tens place)
      Step 3: Use 9 as the hundreds place → 9
      Step 4: Subtract 1 from the unit digit → 3 - 1 = 2 (thousands place)
      Step 5: Take the tens digit as is → 2 (ten-thousands place)
      Final Result:
      → 10000 × 2 + 1000 × 2 + 100 × 9 + 10 × 7 + 7 =
      → 20000 + 2000 + 900 + 70 + 7 = 22977`,
      videoUrl: step9
    }
  ];

  const [apiVideos, setApiVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRefs = useRef([]);
  const sectionRefs = useRef([]);
  const videos = [...staticVideos, ...apiVideos];
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('https://multiplication-app-videouploader.onrender.com/api/videos');
        const enhancedApiVideos = response.data.map(video => ({
          ...video,
          thumbnail: video.thumbnail || "/images/default-thumb.jpg"
        }));
        setApiVideos(enhancedApiVideos);
        setCurrentVideo(staticVideos[0] || enhancedApiVideos[0]);
      } catch (err) {
        console.error('Failed to fetch videos:', err);
        setCurrentVideo(staticVideos[0]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handlePlayPause = () => {
    if (!currentVideo) return;
    const videoElement = videoRefs.current[currentVideo._id];
    if (isPlaying) {
      videoElement.pause();
    } else {
      videoElement.play().catch(e => console.error('Play error:', e));
    }
    setIsPlaying(!isPlaying);
  };

  const handleForward = () => {
    if (!currentVideo) return;
    const videoElement = videoRefs.current[currentVideo._id];
    videoElement.currentTime += 5;
  };

  const handleBackward = () => {
    if (!currentVideo) return;
    const videoElement = videoRefs.current[currentVideo._id];
    videoElement.currentTime = Math.max(0, videoElement.currentTime - 5);
  };

  const changeVideo = (video) => {
    if (isPlaying && currentVideo) {
      videoRefs.current[currentVideo._id]?.pause();
      setIsPlaying(false);
    }
    setCurrentVideo(video);
  };
  useEffect(() => {
    if (videos.length === 0) return;

    const handleScroll = () => {
      sectionRefs.current.forEach((section, index) => {
        if (!section || index >= videos.length) return;
        
        const rect = section.getBoundingClientRect();
        const videoInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
        
        if (videoInView) {
          const video = videos[index];
          if (currentVideo?._id !== video._id) changeVideo(video);
          if (!isPlaying) {
            const videoElement = videoRefs.current[video._id];
            if (videoElement) {
              videoElement.play().catch(e => console.error('Play error:', e));
              setIsPlaying(true);
            }
          }
        } else {
          if (currentVideo?._id === videos[index]._id && isPlaying) {
            const videoElement = videoRefs.current[videos[index]._id];
            if (videoElement) {
              videoElement.pause();
              setIsPlaying(false);
            }
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentVideo, isPlaying, videos]);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading fun videos...</p>
      </div>
    );
  }

  return (
    <div className="video-player-app">
      {videos.map((video, index) => (
        <section 
          key={video._id}
          ref={el => sectionRefs.current[index] = el}
          className={`video-section ${currentVideo?._id === video._id ? 'active' : ''}`}
        >
          <div className="video-header">
            <h2 className="video-title">
              {video.title}
              {video._id.startsWith('static-') && (
                <span className="local-badge">📁 Saved Video</span>
              )}
            </h2>
            <p className="video-description">{video.description}</p>
          </div>
          
          <div className="video-frame">
            <div className="video-wrapper">
              <video
                ref={el => videoRefs.current[video._id] = el}
                src={video.videoUrl}
                poster={video.thumbnail}
                controls={false}
                muted={false}
                onClick={handlePlayPause}
                playsInline
              />
              {currentVideo?._id === video._id && (
                <div className="video-controls-container">
                  <div className="video-controls">
                    <button 
                      onClick={handleBackward} 
                      className="control-btn backward-btn"
                      aria-label="Rewind 5 seconds"
                    >
                      <span className="btn-icon">⏪</span>
                      <span className="btn-text">5 sec</span>
                    </button>
                    
                    <button 
                      onClick={handlePlayPause} 
                      className="control-btn play-btn"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      <span className="btn-icon">
                        {isPlaying ? '⏸️' : '▶️'}
                      </span>
                      <span className="btn-text">
                        {isPlaying ? 'Pause' : 'Play'}
                      </span>
                    </button>
                    
                    <button 
                      onClick={handleForward} 
                      className="control-btn forward-btn"
                      aria-label="Forward 5 seconds"
                    >
                      <span className="btn-text">5 sec</span>
                      <span className="btn-icon">⏩</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default VideoPlayerApp;
