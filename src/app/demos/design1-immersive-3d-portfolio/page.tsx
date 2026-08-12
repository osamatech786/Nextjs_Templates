"use client";
import { useEffect } from 'react';
import Head from 'next/head';

export default function design1immersive3dportfolioTemplate() {
  useEffect(() => {
    // Run the extracted script
    try {
      
    } catch(e) {
      console.error("Error running template script:", e);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Immersive 3D Portfolio Hero</title>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: `<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
` }} />
      <style dangerouslySetInnerHTML={{ __html: `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
            min-height: 100vh;
            overflow-x: hidden;
            color: white;
        }

        #canvas-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        }

        .hero-content {
            position: relative;
            z-index: 10;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 2rem;
            text-align: center;
        }

        .glass-panel {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 3rem 4rem;
            max-width: 800px;
            transform: translateY(50px);
            opacity: 0;
            animation: slideUp 1s ease-out 0.5s forwards;
        }

        @media (prefers-reduced-motion: reduce) {
            .glass-panel { animation: none !important; }
            .mouse-icon { display: none; }
            #canvas-container { display: none; }
        }

        @keyframes slideUp {
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        .tagline {
            font-size: 1rem;
            text-transform: uppercase;
            letter-spacing: 4px;
            color: #00d4ff;
            margin-bottom: 1rem;
            opacity: 0;
            animation: fadeIn 0.8s ease-out 0.8s forwards;
        }

        h1 {
            font-size: clamp(2.5rem, 6vw, 5rem);
            font-weight: 700;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            background: linear-gradient(135deg, #fff 0%, #00d4ff 50%, #ff006e 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            opacity: 0;
            animation: fadeIn 0.8s ease-out 1s forwards;
        }

        @keyframes fadeIn {
            to {
                opacity: 1;
            }
        }

        .subtitle {
            font-size: 1.125rem;
            color: rgba(255, 255, 255, 0.7);
            max-width: 600px;
            margin: 0 auto 2rem;
            line-height: 1.7;
            opacity: 0;
            animation: fadeIn 0.8s ease-out 1.2s forwards;
        }

        .cta-button {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem 2.5rem;
            background: linear-gradient(135deg, #00d4ff 0%, #8338ec 100%);
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.3s ease;
            opacity: 0;
            animation: fadeIn 0.8s ease-out 1.4s forwards;
            border: none;
            cursor: pointer;
        }

        .cta-button:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 40px rgba(0, 212, 255, 0.4);
        }

        .cta-button svg {
            width: 20px;
            height: 20px;
            transition: transform 0.3s ease;
        }

        .cta-button:hover svg {
            transform: translateX(4px);
        }

        .scroll-indicator {
            position: absolute;
            bottom: 3rem;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            opacity: 0;
            animation: fadeIn 0.8s ease-out 2s forwards;
        }

        .scroll-indicator span {
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: rgba(255, 255, 255, 0.5);
        }

        .mouse-icon {
            width: 24px;
            height: 40px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 12px;
            position: relative;
        }

        .mouse-icon::before {
            content: '';
            position: absolute;
            top: 8px;
            left: 50%;
            transform: translateX(-50%);
            width: 4px;
            height: 8px;
            background: #00d4ff;
            border-radius: 2px;
            animation: scroll 2s infinite;
        }

        @keyframes scroll {
            0%, 100% {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            50% {
                opacity: 0.3;
                transform: translateX(-50%) translateY(12px);
            }
        }

        .gradient-lighting {
            position: fixed;
            width: 600px;
            height: 600px;
            border-radius: 50%;
            filter: blur(150px);
            opacity: 0.3;
            pointer-events: none;
            z-index: 0;
            transition: all 0.5s ease;
        }

        .gradient-1 {
            background: radial-gradient(circle, #00d4ff 0%, transparent 70%);
        }

        .gradient-2 {
            background: radial-gradient(circle, #ff006e 0%, transparent 70%);
        }

        .gradient-3 {
            background: radial-gradient(circle, #8338ec 0%, transparent 70%);
        }

        @media (max-width: 768px) {
            .glass-panel {
                padding: 2rem;
                margin: 1rem;
            }

            h1 {
                font-size: 2.5rem;
            }

            .subtitle {
                font-size: 1rem;
            }
        }
    ` }} />
      <div dangerouslySetInnerHTML={{ __html: `
    <div class="gradient-lighting gradient-1" id="grad1"></div>
    <div class="gradient-lighting gradient-2" id="grad2"></div>
    <div class="gradient-lighting gradient-3" id="grad3"></div>
    
    <a href="#main-content" style="position:absolute;top:-999px;left:-999px;z-index:9999;padding:1rem;background:#00d4ff;color:#0a0a0f;font-weight:600;text-decoration:none;border-radius:8px;">Skip to main content</a>
    <div id="canvas-container"></div>

    <div class="hero-content">
        <div class="glass-panel" id="main-content">
            <p class="tagline">Creative Developer & Designer</p>
            <h1>Crafting Digital Experiences That Inspire</h1>
            <p class="subtitle">I transform bold ideas into immersive digital realities where creativity meets cutting-edge technology.</p>
            <button class="cta-button" aria-label="Explore my work portfolio">
                Explore My Work
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </button>
        </div>
    </div>

    <div class="scroll-indicator" role="status" aria-live="polite">
        <span>Scroll</span>
        <div class="mouse-icon"></div>
    </div>

    
    <script>
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        document.getElementById('canvas-container').appendChild(renderer.domElement);

        // Mouse position tracking
        let mouseX = 0, mouseY = 0;
        let targetMouseX = 0, targetMouseY = 0;

        document.addEventListener('mousemove', (e) => {
            targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
            targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;

            // Update gradient lighting position
            const grad1 = document.getElementById('grad1');
            const grad2 = document.getElementById('grad2');
            const grad3 = document.getElementById('grad3');
            
            grad1.style.left = \`\${e.clientX - 300}px\`;
            grad1.style.top = \`\${e.clientY - 300}px\`;
            grad2.style.left = \`\${e.clientX + 100}px\`;
            grad2.style.top = \`\${e.clientY + 50}px\`;
            grad3.style.left = \`\${e.clientX - 150}px\`;
            grad3.style.top = \`\${e.clientY - 100}px\`;
        });

        // Create shapes
        const shapes = [];
        const geometries = [
            new THREE.TorusGeometry(1, 0.3, 16, 100),
            new THREE.IcosahedronGeometry(1),
            new THREE.BoxGeometry(1.2, 1.2, 1.2),
            new THREE.OctahedronGeometry(1),
            new THREE.TetrahedronGeometry(1)
        ];

        const colors = [0x00d4ff, 0xff006e, 0x8338ec];

        for (let i = 0; i < 15; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = new THREE.MeshPhysicalMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                metalness: 0.3,
                roughness: 0.2,
                transparent: true,
                opacity: 0.8,
                emissive: colors[Math.floor(Math.random() * colors.length)],
                emissiveIntensity: 0.2
            });

            const mesh = new THREE.Mesh(geometry, material);
            
            mesh.position.x = (Math.random() - 0.5) * 20;
            mesh.position.y = (Math.random() - 0.5) * 15;
            mesh.position.z = (Math.random() - 0.5) * 10 - 5;

            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;

            const scale = 0.3 + Math.random() * 1.2;
            mesh.scale.set(scale, scale, scale);

            mesh.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                },
                floatSpeed: Math.random() * 0.5 + 0.5,
                floatOffset: Math.random() * Math.PI * 2,
                originalY: mesh.position.y
            };

            shapes.push(mesh);
            scene.add(mesh);
        }

        // Particle system
        const particleCount = 3000;
        const particleGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors_particles = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 10;

            const colorChoice = Math.random();
            if (colorChoice < 0.33) {
                colors_particles[i * 3] = 0;
                colors_particles[i * 3 + 1] = 0.83;
                colors_particles[i * 3 + 2] = 1;
            } else if (colorChoice < 0.66) {
                colors_particles[i * 3] = 1;
                colors_particles[i * 3 + 1] = 0;
                colors_particles[i * 3 + 2] = 0.43;
            } else {
                colors_particles[i * 3] = 0.51;
                colors_particles[i * 3 + 1] = 0.22;
                colors_particles[i * 3 + 2] = 0.93;
            }

            sizes[i] = Math.random() * 2 + 0.5;
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors_particles, 3));
        particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const particleMaterial = new THREE.PointsMaterial({
            size: 1.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        camera.position.z = 8;

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0x00d4ff, 1, 100);
        pointLight1.position.set(10, 10, 10);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xff006e, 1, 100);
        pointLight2.position.set(-10, -10, 10);
        scene.add(pointLight2);

        // Animation
        let time = 0;

        function animate() {
            requestAnimationFrame(animate);
            time += 0.01;

            // Smooth mouse interpolation
            mouseX += (targetMouseX - mouseX) * 0.05;
            mouseY += (targetMouseY - mouseY) * 0.05;

            // Rotate camera based on mouse
            camera.position.x = mouseX * 2;
            camera.position.y = mouseY * 2;
            camera.lookAt(scene.position);

            // Animate shapes
            shapes.forEach((shape, index) => {
                shape.rotation.x += shape.userData.rotationSpeed.x;
                shape.rotation.y += shape.userData.rotationSpeed.y;
                shape.rotation.z += shape.userData.rotationSpeed.z;

                // Floating animation
                shape.position.y = shape.userData.originalY + 
                    Math.sin(time * shape.userData.floatSpeed + shape.userData.floatOffset) * 0.5;

                // Mouse interaction for nearby shapes
                const dx = mouseX * 5 - shape.position.x;
                const dy = mouseY * 5 - shape.position.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 3) {
                    const factor = (3 - dist) / 3 * 0.3;
                    shape.position.x += dx * factor * 0.02;
                    shape.position.y += dy * factor * 0.02;
                }
            });

            // Animate particles
            const particlePositions = particles.geometry.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                particlePositions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.002;
                
                // Particle mouse interaction
                const px = particlePositions[i * 3];
                const py = particlePositions[i * 3 + 1];
                const pz = particlePositions[i * 3 + 2];
                
                const dx = mouseX * 10 - px;
                const dy = mouseY * 10 - py;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 5) {
                    const factor = (5 - dist) / 5;
                    particlePositions[i * 3] -= dx * factor * 0.01;
                    particlePositions[i * 3 + 1] -= dy * factor * 0.01;
                }
            }
            particles.geometry.attributes.position.needsUpdate = true;

            // Update lights
            pointLight1.position.x = mouseX * 10;
            pointLight1.position.y = mouseY * 10;
            pointLight2.position.x = -mouseX * 10;
            pointLight2.position.y = -mouseY * 10;

            renderer.render(scene, camera);
        }

        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    </script>
` }} />
    </>
  );
}
