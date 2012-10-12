var Demo = {
	Models:      {},
	Collections: {},
	Views:       {},
	Utils:       {},

	// Called once, at app startup
	init: function () {
		// Grab the Trigger twitter feed
		forge.request.ajax({
			url: "https://twitter.com/statuses/user_timeline/14972793.json",
			dataType: "json",
			success: showIndex,
      error: showNewTwitterFeed
		});

		// to be called once we have the Trigger twitter feed
		function showIndex(data) {
			// Save away initial data
			Demo.items = new Demo.Collections.Items(data);

			// Set up Backbone
			Demo.router = new Demo.Router();
			Backbone.history.start();
		}

		// to be called when former twitter timeline doesn't work
    function showNewTwitterFeed(error) {
      alert('Could not grab original twitter feed: ' + error.message);

      forge.request.ajax({
        // Limited to 10 based on new API:
        // https://dev.twitter.com/docs/ios/making-api-requests-twrequest
        url: "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=triggercorp&count=10&include_entities=1&include_rts=1",
        dataType: "json",
        success: showIndex,
        error: showError
      });
    }

    // to be called when network is down
    // -or- Twitter inevitably changes their API again:
    function showError(error) {
      alert('Is your network down? ' + error.message);
    }
	}
};
