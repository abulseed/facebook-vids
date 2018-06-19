# Backend

This CLI app accepts a valid facebook `access_token` & a facebook page `url` from the user and aggregates the latest 500 videos of the selected page.

## Resources

1- Node.js.

2- Typescript.

3- Gulp.

## Application performance

The app performance is highly affected by the internet connection speed. Kindly consider measuring the app performance using multiple runs and calculate the mean time cost for all the runs.

### Note

Please note that total count of views is not included, due to access limitations on the video insights edge.

## Run the application

Note: This application requires `node` and `npm` to be installed. Please refer to [Node.js](https://nodejs.org/en/) for installation options.
Clone the Git repository from this [link](https://github.com/abulseed/facebook-vids.git). Once the cloning is done to start the development server run these commands in order:

1- `gulp`

2- `node dist/main.js`
