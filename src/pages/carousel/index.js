import React from "react";
import ImageCarousel from "./ImageCarousel";

const App = () => {
  const images = [
    "https://img.freepik.com/free-vector/sphere-grid-wave-with-binary-code-ai-artificial-intelligence-logo-hand-machine-learning-concept_127544-855.jpg?w=1480&t=st=1687942897~exp=1687943497~hmac=a4f473458e70c8be632e7fd502013ee79c39e929734381836a6e3e1392de373b",
    "https://img.freepik.com/free-vector/wireframe-robot-ai-artificial-intelligence-robotic-hand-machine-learning-cyber-mind-domination-concept_127544-852.jpg?t=st=1687879237~exp=1687879837~hmac=ec8455d89afcdd3d18d27e0bad0b6621170eb8000bd645ac5ca7fee480a179b0",
    "https://img.freepik.com/free-vector/5g-network-technology-isometric-concept_107791-381.jpg?t=st=1687879237~exp=1687879837~hmac=156dbfd0b46969ece7370f791b264fff059b85dee514c3726d19f00c1418483a",
    "https://img.freepik.com/premium-vector/data-flow-binary-data-flow-tunnel-virtual-tunnel-warp-coding-programming-hacking-concept-abstract-futuristic-cyberspace-big-data-digital-code-with-digits-10-vector-illustration_127544-1918.jpg",
    "https://img.freepik.com/premium-vector/smart-industry-40-concept-with-magnifier-wireframe-hand-icons-factory-automation-autonomous-industrial-technology-magnifying-glass-industrial-infographic-vector-illustration_127544-1990.jpg",
  ];

  return (
    <div>
      <h1>Image Carousel Example</h1>
      <ImageCarousel images={images} />
      {/* Other components and content */}
    </div>
  );
};

export default App;
