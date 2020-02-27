# busmall
Problem Domain
You’ve been hired by a startup called BusMall, whose product is similar to the SkyMall catalog found in the seatback pockets on airplanes: a catalog of assorted high-markup products provided to a captive audience seeking a mental escape from the drudgery of travel. The difference with BusMall is that instead of their catalog being placed in airplanes, they are placed on local busses while commuting through traffic.

Since catalogs are expensive to print and distribute, and the products cost money to make and warehouse, and BusMall is a lean startup that needs to carefully watch its expenditures, BusMall wants to feature only the items in its catalog that are the most likely to sell.

This means that BusMall wants to do market analysis on proposed products to test their potential customer interest… before actually putting them into the catalog and getting the manufacturing wheels in motion.

To make this market analysis maximally effective, BusMall wants you to build an app that displays potential products to individuals in focus groups (three products at a time, side-by-side-by-side) so you’ll need to manage the size and the aspect ratio of the images.

The app’s purpose is to have the group members choose which product, of the three displayed images, that they would be most likely to purchase, and then store, calculate, and visually display the resulting data.

To keep the product selection process as untainted as possible, you have been instructed to not allow any results to be shown to users until there have been a total of 25 selections made.

The marketing team is not only interested in the total number of clicks, but also the percentage of times that an item was clicked when it was shown. So, you’ll also need to keep track of how many times each image is displayed and do the calculations.

You are also responsible for the look and feel of the app, so don’t forget a custom font, color palette, layout with semantic HTML, and so on.

# User Stories
1. As a marketer, I want to prevent users from seeing the same image in two subsequent iterations, so that they are not biased.
  -Update your algorithm to randomly generate three unique product images from the images directory.
  -Update your algorithm so that new products are generated, confirm that these products are not duplicates from the immediate previous set.
2. As a user, I would like to track how many times a product has appeared in a voting session, so that I can track analytics on each piece of data.
  -Add an additional property to your constructor function that tracks the number of times the product has been shown.
  -Update this new property every time the product is shown as one of the three options on the screen for the viewer to choose.
3. As a marketing manager, I would like a visual representation of how many times a product was clicked so that I can visually analyze the results.
  -Using ChartJS (imported from CDN), display the vote totals and the number of times a product was viewed in a bar chart format. (hint: don’t forget about the <canvas> tags)
  -Place the bar chart in the section located beneath your three product images
  -The bar charts should only appear after all voting data has been collected.
