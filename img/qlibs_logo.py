import matplotlib.pyplot as plt
from PIL import Image, ImageDraw, ImageFont
import numpy as np

# Initialize a transparent canvas
width, height = 900, 900
image = Image.new("RGBA", (width, height), (255, 255, 255, 255))
draw = ImageDraw.Draw(image)

# Define the text and font sizes
text = "Qlibs"
font_path = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
font_size = 120
font = ImageFont.truetype(font_path, font_size)
font_small = ImageFont.truetype(font_path, 60)

# Define colors
text_color = "darkslategray"
icon_color = "royalblue"

# Calculate text size and position
text_width, text_height = draw.textsize(text, font=font)
text_x = (width - text_width) // 2 + 70
text_y = (height - text_height) // 2 + 10

# Draw the text
draw.text((text_x, text_y), text, fill=text_color, font=font)
draw.text((text_x+350, text_y+40), "++", fill="black", font=font_small)

# Draw curly braces icon
brace_font_size = 160
brace_font = ImageFont.truetype(font_path, brace_font_size)
brace_text = "{}"
brace_width, brace_height = draw.textsize(brace_text, font=brace_font)
brace_x = text_x - brace_width - 20  # Position to the left of the text
brace_y = (height - brace_height) // 2 - 10

draw.text((brace_x, brace_y), brace_text, fill=icon_color, font=brace_font)

# Convert to array and plot using matplotlib for better visualization
image_array = np.array(image)

#plt.figure(figsize=(10, 5))
#plt.imshow(image_array)
#plt.axis('off')
#plt.show()

# Save the image with a transparent background
image.save("qlibs_logo_v2.png", "PNG")
