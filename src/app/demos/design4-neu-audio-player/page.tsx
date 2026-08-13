// @ts-nocheck
"use client";
import { useEffect } from 'react';
import Head from 'next/head';

export default function design4neuaudioplayerTemplate() {
  useEffect(() => {
    let player = null;
    // Run the extracted script
    try {
      
    class AudioPlayer {
      constructor() {
        this.abortController = new AbortController();
        this.isPlaying = false;
        this.currentTrack = 0;
        this.volume = 0.7;
        this.progress = 0.38;
        this.animationId = null;

        this.tracks = [
          { title: 'Midnight Dreams', artist: 'Luna Echo', duration: '3:45' },
          { title: 'Starlight Serenade', artist: 'Aurora Keys', duration: '4:12' },
          { title: 'Velvet Horizon', artist: 'The Night Owls', duration: '3:58' },
          { title: 'Crystal Waters', artist: 'Marina Blue', duration: '5:01' },
          { title: 'Echoes of Tomorrow', artist: 'Future Sound', duration: '4:33' }
        ];

        this.canvas = document.getElementById('waveform');
        this.ctx = this.canvas.getContext('2d');
        this.barCount = 40;
        this.barHeights = new Array(this.barCount).fill(0);
        this.targetHeights = new Array(this.barCount).fill(0);

        this.init();
      }

      init() {
        this.setupCanvas();
        this.bindEvents();
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReducedMotion) {
          this.animate();
        }
      }

      setupCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * window.devicePixelRatio;
        this.canvas.height = rect.height * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        this.width = rect.width;
        this.height = rect.height;
      }

      bindEvents() {
        const playBtn = document.querySelector('.play-btn');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const progressTrack = document.querySelector('.progress-track');
        const volumeTrack = document.querySelector('.volume-track');
        const volumeIcon = document.querySelector('.volume-icon');
        const trackItems = document.querySelectorAll('.track-item');

        playBtn.addEventListener('click', () => this.togglePlay());
        prevBtn.addEventListener('click', () => this.prevTrack());
        nextBtn.addEventListener('click', () => this.nextTrack());

        progressTrack.addEventListener('click', (e) => this.seekProgress(e));
        volumeTrack.addEventListener('click', (e) => this.seekVolume(e));
        volumeIcon.addEventListener('click', () => this.toggleMute());

        this.makeDraggable(document.querySelector('.progress-thumb'), (x) => {
          const track = document.querySelector('.progress-track');
          const rect = track.getBoundingClientRect();
          this.progress = Math.max(0, Math.min(1, x / rect.width));
          this.updateProgressUI();
        });

        this.makeDraggable(document.querySelector('.volume-thumb'), (x) => {
          const track = document.querySelector('.volume-track');
          const rect = track.getBoundingClientRect();
          this.volume = Math.max(0, Math.min(1, x / rect.width));
          this.updateVolumeUI();
        });

        trackItems.forEach((item, index) => {
          item.addEventListener('click', () => this.selectTrack(index));
        });

        window.addEventListener('resize', () => this.setupCanvas(), { signal: this.abortController.signal });
      }

      makeDraggable(element, onMove) {
        let isDragging = false;

        const update = (e) => {
          const clientX = e.touches ? e.touches[0].clientX : e.clientX;
          const rect = element.parentElement.getBoundingClientRect();
          const x = clientX - rect.left - rect.width / 2;
          onMove(x + rect.width / 2);
        };

        const handleKeyDown = (e) => {
          const step = e.shiftKey ? 0.1 : 0.02;
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            onMove(-step * element.parentElement.getBoundingClientRect().width + element.parentElement.getBoundingClientRect().width / 2);
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            onMove(step * element.parentElement.getBoundingClientRect().width + element.parentElement.getBoundingClientRect().width / 2);
          }
        };

        element.addEventListener('mousedown', (e) => {
          isDragging = true;
          e.preventDefault();
        });

        element.addEventListener('touchstart', (e) => {
          isDragging = true;
          e.preventDefault();
        });

        element.addEventListener('keydown', handleKeyDown);

        document.addEventListener('mousemove', (e) => {
          if (isDragging) update(e);
        }, { signal: this.abortController.signal });

        document.addEventListener('touchmove', (e) => {
          if (isDragging) update(e);
        }, { signal: this.abortController.signal });

        document.addEventListener('mouseup', () => { isDragging = false; }, { signal: this.abortController.signal });
        document.addEventListener('touchend', () => { isDragging = false; }, { signal: this.abortController.signal });
      }

      togglePlay() {
        this.isPlaying = !this.isPlaying;
        const btn = document.querySelector('.play-btn');
        if (btn) btn.classList.toggle('playing', this.isPlaying);

        if (!this.isPlaying) {
          this.targetHeights = this.targetHeights.map(() => 0.15);
        } else if (!this.animationId) {
          this.animate();
        }
      }

      prevTrack() {
        this.currentTrack = (this.currentTrack - 1 + this.tracks.length) % this.tracks.length;
        this.updateTrackInfo();
      }

      nextTrack() {
        this.currentTrack = (this.currentTrack + 1) % this.tracks.length;
        this.updateTrackInfo();
      }

      selectTrack(index) {
        this.currentTrack = index;
        this.updateTrackInfo();
        if (!this.isPlaying) this.togglePlay();
      }

      updateTrackInfo() {
        const track = this.tracks[this.currentTrack];
        document.querySelector('.track-title').textContent = track.title;
        document.querySelector('.artist-name').textContent = track.artist;

        document.querySelectorAll('.track-item').forEach((item, i) => {
          item.classList.toggle('active', i === this.currentTrack);
        });
      }

      seekProgress(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        this.progress = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        this.updateProgressUI();
      }

      seekVolume(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        this.volume = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        this.updateVolumeUI();
      }

      toggleMute() {
        const icon = document.querySelector('.volume-icon');
        if (this.volume > 0) {
          this.prevVolume = this.volume;
          this.volume = 0;
          icon.classList.add('muted');
        } else {
          this.volume = this.prevVolume || 0.7;
          icon.classList.remove('muted');
        }
        this.updateVolumeUI();
      }

      updateProgressUI() {
        const fill = document.querySelector('.progress-fill');
        const thumb = document.querySelector('.progress-thumb');
        fill.style.width = `${this.progress * 100}%`;
        thumb.style.right = `calc(${100 - this.progress * 100}% - 9px)`;

        const current = document.querySelector('.time.current');
        const total = document.querySelector('.time.total');
        const totalSeconds = 225;
        const currentSeconds = Math.floor(this.progress * totalSeconds);
        current.textContent = `${Math.floor(currentSeconds / 60)}:${(currentSeconds % 60).toString().padStart(2, '0')}`;
      }

      updateVolumeUI() {
        const fill = document.querySelector('.volume-fill');
        const thumb = document.querySelector('.volume-thumb');
        const icon = document.querySelector('.volume-icon');
        fill.style.width = `${this.volume * 100}%`;
        thumb.style.right = `calc(${100 - this.volume * 100}% - 7px)`;

        icon.classList.toggle('muted', this.volume === 0);
      }

      animate() {
        const isIdle = this.updateWaveform();
        if (!isIdle) {
          this.animationId = requestAnimationFrame(() => this.animate());
        } else {
          this.animationId = null;
        }
      }

      updateWaveform() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        const barWidth = (this.width / this.barCount) * 0.7;
        const gap = (this.width / this.barCount) * 0.3;
        const maxHeight = this.height * 0.9;
        const minHeight = this.height * 0.15;
        let allIdle = !this.isPlaying;

        for (let i = 0; i < this.barCount; i++) {
          if (this.isPlaying) {
            this.targetHeights[i] = 0.2 + Math.random() * 0.8;
            this.barHeights[i] += (this.targetHeights[i] - this.barHeights[i]) * 0.15;
          } else {
            this.targetHeights[i] = 0.15;
            this.barHeights[i] += (this.targetHeights[i] - this.barHeights[i]) * 0.1;
            if (Math.abs(this.barHeights[i] - this.targetHeights[i]) > 0.01) {
              allIdle = false;
            }
          }

          const height = minHeight + (maxHeight - minHeight) * this.barHeights[i];
          const x = i * (barWidth + gap);
          const y = (this.height - height) / 2;

          const gradient = this.ctx.createLinearGradient(x, y + height, x, y);
          gradient.addColorStop(0, '#6B5B95');
          gradient.addColorStop(1, '#88B04B');

          this.ctx.fillStyle = gradient;
          this.ctx.beginPath();
          this.ctx.roundRect(x, y, barWidth, height, 3);
          this.ctx.fill();
        }
        return allIdle;
      }

      destroy() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        this.abortController.abort();
      }
    }

    player = new AudioPlayer();
  
    } catch(e) {
      console.error("Error running template script:", e);
    }
    return () => {
      if (player) player.destroy();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Neumorphic Audio Player</title>
      </Head>
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: `` }} />
      <a href="#player-card" className="skip-to-content">Skip to content</a>
      <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: `
    :root {
      --bg-light: #E8D5C4;
      --bg-dark: #D4C4E8;
      --surface: #E0E0E0;
      --shadow-dark: #A3B1C6;
      --shadow-light: #FFFFFF;
      --accent-primary: #6B5B95;
      --accent-secondary: #88B04B;
      --text-primary: #4A4A4A;
      --text-secondary: #7A7A7A;

      --shadow-outer: 8px 8px 15px var(--shadow-dark), -8px -8px 15px var(--shadow-light);
      --shadow-outer-sm: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light);
      --shadow-inset: inset 4px 4px 8px var(--shadow-dark), inset -4px -4px 8px var(--shadow-light);
      --shadow-inset-sm: inset 2px 2px 5px var(--shadow-dark), inset -2px -2px 5px var(--shadow-light);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Segoe UI', system-ui, sans-serif;
      color: var(--text-primary);
    }

    .background {
      position: fixed;
      inset: 0;
      background: linear-gradient(135deg, var(--bg-light) 0%, var(--bg-dark) 100%);
      z-index: -1;
    }

    .player-card {
      width: 380px;
      padding: 35px 30px;
      background: var(--surface);
      border-radius: 30px;
      box-shadow: var(--shadow-outer);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    /* Album Art */
    .album-container {
      position: relative;
    }

    .album-art {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      background: linear-gradient(145deg, #D5D5D5, #EBEBEB);
      box-shadow: var(--shadow-outer);
      position: relative;
      overflow: hidden;
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="%236B5B95"/><circle cx="100" cy="100" r="70" fill="%238B7BB5"/><circle cx="100" cy="100" r="50" fill="%23A99BC5"/><circle cx="100" cy="100" r="30" fill="%23E0E0E0"/></svg>');
      background-size: cover;
    }

    .album-shine {
      position: absolute;
      top: 10%;
      left: 15%;
      width: 25%;
      height: 15%;
      background: linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 100%);
      border-radius: 50%;
      filter: blur(3px);
    }

    .album-reflection {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 60%;
      background: linear-gradient(to top, rgba(255,255,255,0.25) 0%, transparent 100%);
      pointer-events: none;
    }

    /* Track Info */
    .track-info {
      text-align: center;
    }

    .track-title {
      font-size: 22px;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 4px;
    }

    .artist-name {
      font-size: 15px;
      color: var(--accent-primary);
      font-weight: 500;
    }

    .album-name {
      font-size: 13px;
      color: var(--text-secondary);
      margin-top: 2px;
    }

    /* Waveform */
    .waveform-container {
      width: 100%;
      height: 60px;
      padding: 10px 0;
    }

    #waveform {
      width: 100%;
      height: 100%;
    }

    /* Progress */
    .progress-section {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .time {
      font-size: 12px;
      color: var(--text-secondary);
      min-width: 35px;
      font-variant-numeric: tabular-nums;
    }

    .time.current { text-align: right; }
    .time.total { text-align: left; }

    .progress-track {
      flex: 1;
      height: 10px;
      background: var(--surface);
      border-radius: 10px;
      box-shadow: var(--shadow-inset-sm);
      position: relative;
      cursor: pointer;
    }

    .progress-fill {
      height: 100%;
      width: 38%;
      background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
      border-radius: 10px;
      position: relative;
    }

    .progress-thumb {
      position: absolute;
      right: -8px;
      top: 50%;
      transform: translateY(-50%);
      width: 18px;
      height: 18px;
      background: var(--surface);
      border-radius: 50%;
      box-shadow: var(--shadow-outer-sm);
      cursor: grab;
    }

    .progress-thumb:active { cursor: grabbing; }

    /* Controls */
    .controls {
      display: flex;
      align-items: center;
      gap: 25px;
    }

    .control-btn {
      background: var(--surface);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      color: var(--text-primary);
    }

    .prev-btn, .next-btn {
      width: 48px;
      height: 48px;
      box-shadow: var(--shadow-outer-sm);
    }

    .prev-btn svg, .next-btn svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }

    .play-btn {
      width: 65px;
      height: 65px;
      box-shadow: var(--shadow-outer);
    }

    .play-icon {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .play-svg, .pause-svg {
      position: absolute;
      width: 28px;
      height: 28px;
      fill: var(--accent-primary);
      transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .play-svg {
      opacity: 1;
      transform: scale(1);
    }

    .pause-svg {
      opacity: 0;
      transform: scale(0.5) rotate(-90deg);
    }

    .play-btn.playing .play-svg {
      opacity: 0;
      transform: scale(0.5) rotate(90deg);
    }

    .play-btn.playing .pause-svg {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }

    .control-btn:hover {
      transform: scale(1.05);
    }

    .control-btn:active {
      transform: scale(0.95);
      box-shadow: var(--shadow-inset-sm);
    }

    /* Volume */
    .volume-section {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .volume-icon {
      background: none;
      border: none;
      cursor: pointer;
      padding: 5px;
      display: flex;
      color: var(--text-secondary);
    }

    .volume-icon svg {
      width: 22px;
      height: 22px;
      fill: currentColor;
    }

    .volume-icon .vol-muted { display: none; }
    .volume-icon.muted .vol-high { display: none; }
    .volume-icon.muted .vol-muted { display: block; }

    .volume-track {
      flex: 1;
      height: 8px;
      background: var(--surface);
      border-radius: 8px;
      box-shadow: var(--shadow-inset-sm);
      position: relative;
      cursor: pointer;
    }

    .volume-fill {
      height: 100%;
      width: 70%;
      background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
      border-radius: 8px;
      position: relative;
    }

    .volume-thumb {
      position: absolute;
      right: -6px;
      top: 50%;
      transform: translateY(-50%);
      width: 14px;
      height: 14px;
      padding: 15px;
      background: var(--surface);
      border-radius: 50%;
      box-shadow: var(--shadow-outer-sm);
      cursor: grab;
    }

    /* Track List */
    .track-list {
      width: 100%;
      max-height: 180px;
      overflow-y: auto;
      padding-right: 5px;
    }

    .track-list::-webkit-scrollbar {
      width: 6px;
    }

    .track-list::-webkit-scrollbar-track {
      background: transparent;
    }

    .track-list::-webkit-scrollbar-thumb {
      background: var(--shadow-dark);
      border-radius: 3px;
    }

    .track-item {
      display: flex;
      align-items: center;
      padding: 12px 15px;
      border-radius: 15px;
      cursor: pointer;
      transition: all 0.2s ease;
      gap: 12px;
    }

    .track-item:hover {
      background: linear-gradient(145deg, #D8D8D8, #E8E8E8);
      transform: translateX(3px);
    }

    .track-item.active {
      background: linear-gradient(145deg, #D0D0D0, #E0E0E0);
      box-shadow: var(--shadow-inset-sm);
    }

    .track-number {
      font-size: 13px;
      color: var(--text-secondary);
      min-width: 20px;
    }

    .track-item.active .track-number {
      color: var(--accent-primary);
      font-weight: 600;
    }

    .track-details {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }

    .track-name {
      font-size: 14px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .track-item.active .track-name {
      color: var(--accent-primary);
      font-weight: 600;
    }

    .track-artist {
      font-size: 12px;
      color: var(--text-secondary);
    }

    .track-duration {
      font-size: 12px;
      color: var(--text-secondary);
      font-variant-numeric: tabular-nums;
    }

    /* Skip to content */
    .skip-to-content {
      position: absolute;
      top: -40px;
      left: 0;
      background: var(--accent-primary);
      color: white;
      padding: 8px 16px;
      z-index: 100;
      text-decoration: none;
      border-radius: 0 0 8px 0;
    }
    .skip-to-content:focus {
      top: 0;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .waveform-container {
        display: none;
      }
    }
  ` }} />
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: `
  <div class="background"></div>

  <main id="player-card" class="player-card">
    <div class="album-container">
      <div class="album-art">
        <div class="album-reflection"></div>
        <div class="album-shine"></div>
      </div>
    </div>

    <div class="track-info">
      <h1 class="track-title">Midnight Dreams</h1>
      <p class="artist-name">Luna Echo</p>
      <p class="album-name">Velvet Nights</p>
    </div>

    <div class="waveform-container">
      <canvas id="waveform" aria-label="Audio waveform visualization for current track"></canvas>
    </div>

    <div class="progress-section">
      <span class="time current">1:24</span>
      <div class="progress-track" role="slider" tabindex="0" aria-label="Track progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="38">
        <div class="progress-fill"></div>
        <div class="progress-thumb"></div>
      </div>
      <span class="time total">3:45</span>
    </div>

    <div class="controls">
      <button class="control-btn prev-btn" aria-label="Previous">
        <svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
      </button>
      <button class="control-btn play-btn" aria-label="Play">
        <div class="play-icon">
          <svg viewBox="0 0 24 24" class="play-svg"><path d="M8 5v14l11-7z"/></svg>
          <svg viewBox="0 0 24 24" class="pause-svg"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        </div>
      </button>
      <button class="control-btn next-btn" aria-label="Next">
        <svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zm2-12v12l6.5-6L8 6zm8 0v12l6.5-6L16 6z"/></svg>
      </button>
    </div>

    <div class="volume-section">
      <button class="volume-icon" aria-label="Volume">
        <svg viewBox="0 0 24 24" class="vol-high"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
        <svg viewBox="0 0 24 24" class="vol-muted"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
      </button>
      <div class="volume-track" role="slider" tabindex="0" aria-label="Volume" aria-valuemin="0" aria-valuemax="100" aria-valuenow="70">
        <div class="volume-fill"></div>
        <div class="volume-thumb"></div>
      </div>
    </div>

    <div class="track-list">
      <div class="track-item active" data-index="0">
        <span class="track-number">1</span>
        <div class="track-details">
          <span class="track-name">Midnight Dreams</span>
          <span class="track-artist">Luna Echo</span>
        </div>
        <span class="track-duration">3:45</span>
      </div>
      <div class="track-item" data-index="1">
        <span class="track-number">2</span>
        <div class="track-details">
          <span class="track-name">Starlight Serenade</span>
          <span class="track-artist">Aurora Keys</span>
        </div>
        <span class="track-duration">4:12</span>
      </div>
      <div class="track-item" data-index="2">
        <span class="track-number">3</span>
        <div class="track-details">
          <span class="track-name">Velvet Horizon</span>
          <span class="track-artist">The Night Owls</span>
        </div>
        <span class="track-duration">3:58</span>
      </div>
      <div class="track-item" data-index="3">
        <span class="track-number">4</span>
        <div class="track-details">
          <span class="track-name">Crystal Waters</span>
          <span class="track-artist">Marina Blue</span>
        </div>
        <span class="track-duration">5:01</span>
      </div>
      <div class="track-item" data-index="4">
        <span class="track-number">5</span>
        <div class="track-details">
          <span class="track-name">Echoes of Tomorrow</span>
          <span class="track-artist">Future Sound</span>
        </div>
        <span class="track-duration">4:33</span>
      </div>
    </div>
  </div>

  
` }} />
    </>
  );
}
