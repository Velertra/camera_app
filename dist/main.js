(()=>{const e=document.getElementById("video"),t=document.getElementById("canvas"),o=t.getContext("2d");function n(){o.drawImage(e,0,0,t.width,t.height);const a=t.toDataURL("image/jpeg");fetch("/process-frame",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({frameData:a})}).then((e=>e.json())).then((e=>{console.log(e)})).catch((e=>{console.error("Error processing frame:",e)})),requestAnimationFrame(n)}navigator.mediaDevices.getUserMedia({video:!0}).then((t=>{e.srcObject=t,requestAnimationFrame(n)})).catch((e=>{console.error("Error accessing webcam:",e)}))})();