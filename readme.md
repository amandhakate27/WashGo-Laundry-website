# WashGo Laundry Service

A responsive laundry service web application where users can select services, add them to a cart, and book online. Booking confirmation is sent via EmailJS.

## Features

- Responsive design for desktop, tablet, and mobile
- Add/remove laundry services to cart
- Dynamic cart and total calculation
- Booking form with validation
- Email confirmation using EmailJS
- Clean, modern UI

## Tech Stack

- HTML5, CSS3, JavaScript (Vanilla)
- EmailJS for email integration

## How to Use

1. Clone or download this repository.
2. Open `index.html` in your browser.
3. Select laundry services and add them to your cart.
4. Fill out the booking form and submit.
5. You will receive a booking confirmation email.

## Folder Structure

```
Tudedude assignment 4/
├── index.html
├── style.css
├── script.js
├── assets/
│   └── (images)
```

## EmailJS Setup

- The project uses EmailJS for sending booking confirmation emails.
- Update the EmailJS public key, service ID, and template ID in the HTML and JS files as per your EmailJS account.
- Make sure your EmailJS template uses triple curly braces (`{{{items}}}`) for the services list.

## Customization

- You can add or remove services by editing the services section in `index.html`.
- Update styles in `style.css` as needed.

## License

This project is for educational/demo purposes.
