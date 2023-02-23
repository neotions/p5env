function setup() {

	createCanvas(1200, 1100);
	noSmooth();

	//Settings for drawing(these are the default values)

	//Set Cell Stroke Weight
	voronoiCellStrokeWeight(1);
	//Set Site Stroke Weight
	voronoiSiteStrokeWeight(3);
	//Set Cell Stroke
	voronoiCellStroke(255);
	//Set Site Stroke
	voronoiSiteStroke(0);
  noStroke();
	//Set flag to draw Site
	voronoiSiteFlag(true);

	//Sets 30 random sites with 50 minimum distance to be added upon computing
	//Please note that this method is just for testing, you should use your own
	//method for placing random sites with minimum distance
	voronoiRndSites(30, 50);

	//Add array of custom sites
	//voronoiSites([[5,5],[10,5],[15,5]]);

	//Add array of custom sites with custom colors associated (255 = white)
	//voronoiSites([[5,20,255],[10,20,255],[15,20,255]]);

	//Remove custom site with coordinates 15,5
	//voronoiRemoveSite(15, 5);

	//Remove custom site with index 0 (in this case it's the site with coordinates [5,5])
	//voronoiRemoveSite(0);

	//Add custom site with custom color at coordinates 50,100 (255 = white)
	//voronoiSite(50, 100, 255);

	//Clear custom sites (does not clear random sites)
	//voronoiClearSites();

	//Jitter Settings (These are the default settings)

	//Maximum distance between jitters
	voronoiJitterStepMax(20);
	//Minimum distance between jitters
	voronoiJitterStepMin(5);
	//Scales each jitter
	voronoiJitterFactor(3);
	//Jitter edges of diagram
	voronoiJitterBorder(false);

	//Compute voronoi diagram with size 700 by 500
	//With a prepared jitter structure (true)
	voronoi(width, height, true);

	//Get the raw diagram, for more advanced use
	//This is purely to get information, doesn't change the diagram
	//https://github.com/gorhill/Javascript-Voronoi
	var diagram = voronoiGetDiagram();
	console.log(diagram);

	//Get simplified cells without jitter, for more advanced use
	var normal = voronoiGetCells();
	console.log(normal);

	//Get simplified cells with jitter, for more advanced use
	var jitter = voronoiGetCellsJitter();
	console.log(jitter);

	//Simulate initial mouse press for simplicity


}

function draw(){
	background(150);	

  voronoiDraw(0, 0, true, false);

}