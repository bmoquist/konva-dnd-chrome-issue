Created with Create React App

To run, clone the repo. Run ```yarn``` to install the npm packages. Then, run ```yarn start```.

Initial issue:
Chrome causing a change in cursor behavior during Konva drag and drop.

Resolution:
Double clicking on a Konva object to trigger an event appears to trigger a select/highlighting action in Chrome that leads to the change in cursor behavior.
