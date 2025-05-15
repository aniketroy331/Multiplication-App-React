import React, { useState } from 'react';
import axios from 'axios';
const AdminPanel = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoFile: null
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('video/')) {
        setMessage('Please upload a valid video file');
        return;
      }
      setFormData(prev => ({ ...prev, videoFile: file }));
      setMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.videoFile) {
      setMessage('Please fill all fields and select a video');
      return;
    }
    setIsUploading(true);
    setMessage('Uploading...');
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('video', formData.videoFile);
      const response = await axios.post('http://localhost:5000/api/videos', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        }
      });
      setMessage('Video uploaded successfully!');
      setFormData({
        title: '',
        description: '',
        videoFile: null
      });
      setUploadProgress(0);
    } catch (error) {
      console.error('Upload error:', error);
      setMessage(error.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Student Video Upload
        </h1>
        
        {message && (
          <div className={`mb-4 p-3 rounded-md ${
            message.includes('success') 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Video Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="My Project Video"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your video content"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Video File *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
              <input
                type="file"
                id="videoFile"
                name="videoFile"
                accept="video/*"
                onChange={handleFileChange}
                required
                className="hidden"
              />
              <label
                htmlFor="videoFile"
                className="cursor-pointer flex flex-col items-center"
              >
                <span className="mt-2 text-sm text-gray-600">
                  Click to upload video
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  MP4, WebM, or MOV (Max 500MB)
                </span>
              </label>
            </div>
            {formData.videoFile && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {formData.videoFile.name}
              </p>
            )}
          </div>
          {isUploading && (
            <div className="space-y-1">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progress:</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
          <button
            type="submit"
            disabled={isUploading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isUploading ? 'Uploading...' : 'Upload Video'}
          </button>
        </form>
      </div>
    </div>
  );
};
export default AdminPanel;