import os
import subprocess
import sys

def run_command(cmd):
    print(f"Running: {cmd}")
    subprocess.run(cmd, shell=True, check=True)

# Install yt-dlp
run_command(f"{sys.executable} -m pip install yt-dlp")

# Ensure directory exists
os.makedirs("assets/videos", exist_ok=True)

urls = {
    "video_1.mp4": "https://youtube.com/shorts/isagnPy2mQE",
    "video_2.mp4": "https://youtube.com/shorts/I_0Wn_OrgjI",
    "video_3.mp4": "https://youtube.com/shorts/3xruXyA1kWc",
    "video_4.mp4": "https://youtu.be/byXxQE-6-2M",
    "video_5.mp4": "https://youtube.com/shorts/GZR73Ok3aXU"
}

for filename, url in urls.items():
    output_path = os.path.join("assets/videos", filename)
    # Download as mp4, preferring smaller sizes if possible to ensure fast web load
    cmd = f"{sys.executable} -m yt_dlp -f \"best[ext=mp4][height<=720]\" -o \"{output_path}\" {url}"
    try:
        run_command(cmd)
        print(f"Successfully downloaded {filename}")
    except Exception as e:
        print(f"Failed to download {filename}: {e}")
