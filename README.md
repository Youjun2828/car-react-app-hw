# Context & AJAX React Practice

## Tasks

1. The cars API now has a drivers API! Create a page that pulls in the drivers via a context, and a form to allow addition and updating of driver records! (URL: <https://carsapp2050.herokuapp.com/api/v1/drivers/>). A driver has:

* firstname (String) - required
* lastname (String) - required
* age (Number) - required
* email (String) - required

2. In a separate terminal tab launch the fake server (<https://github.com/jmsherry/fake-server>). Up to you if you use faker or not BUT try to make your own context/pages/forms to CRUD records from the fake server. The data can be anything you like - practice is what we're aiming for here!

If you look at line 5 of `package.json`, you'll see the proxy for the serer has been added for you, so the API endpoint is just `/guests` (or `/whatever you put in the return block here` <https://github.com/jmsherry/fake-server/blob/master/data.js#L14`>)
