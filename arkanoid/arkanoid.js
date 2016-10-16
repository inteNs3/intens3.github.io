// ball variables
var ballY = 200; // Y point of ball spawn
var ballX = 200; // X point of ball spawn
var speed = 5; // speed of ball by default
var ballSize = 16; // size of ball
var ballColor = color(66, 66, 66); // ball color

// tray variables
var traySizeX = 75; // width of tray
var traySizeY = 15; // height of tray
var trayColor = color(0, 0, 0); // color of tray

// blocks variables
//var blockSizeX = 79;
var blockSizeY = 15;
var blockOffset = 5;
var blockCountX = 7;
var blockCountY = 1; // do not use, bugged and not completely implemented
//var blockCount = 7;
var blockColor = color(0, 75, 168);

// settings
var randomColorOnHit = false; // should ball change color to random after hitting anything
var ballSpeedsUpEveryTime = 0; // how much should the ball speed up after hitting a block, leave 0 for none

// do not change
var speedDefault = speed;
var gameOver = false;
var gameWon = false;
var block = [];
var blockIsThere = [];
var score = 0;
var ballDirection = 0;

void setup()
{
	size(600, 600);
}

draw = function() 
{
	background(127, 204, 255);
	
	if(gameOver && !gameWon)
	{
		textSize(32);
		text('game over', width/2-70, height/2);    
	}
	
	if(gameWon)
	{
	    textSize(32);
		text('congratulations', width/2-70, height/2); 
	}
	
	// blocks
	var blockX = blockOffset;
	var blockCount = blockCountX * blockCountY;
	for(var i=1; i<=blockCount; i++)
	{
		blockSizeX = (width - (blockOffset * blockCountX)) / blockCountX - 1;

		if(i!==1){blockX += blockOffset + blockSizeX;}
		block[i] = blockX;
		if(blockIsThere[i]===undefined){blockIsThere[i] = true;}
		// radius: blockX, blockX + blockSizeX
		fill(blockColor);
		if(blockIsThere[i])
		{
			blockCount = blockCountX * blockCountY;
			for(var x=1; x<=blockCountY; x++) // y
			{
				var blockStartY = 5;
				if(i<=blockCountX) // first line (top)
				{
					rect(blockX, blockStartY, blockSizeX, blockSizeY);
				}
				if(i>blockCountX) // 2nd and rest of lines
				{
					if(i===blockCountX+1){blockX = blockOffset;} // reset x pos
					blockStartY = blockSizeY + blockStartY * 2;
					
					block[i] = blockX;
					if(blockIsThere[i]===undefined){blockIsThere[i] = true;}

					rect(blockX, blockStartY, blockSizeX, blockSizeY);
				}
			}
		}
	}
	
	// ball functionality
	noStroke();
	fill(ballColor);
	if(!gameOver && !gameWon) // draw ball only when game is active
	{
		ellipse(ballX, ballY, ballSize, ballSize);
	}
	
	// ball movement
	if(ballX<=0+ballSize/2)
	{ // left wall hit
		ballDirection=1;
		if(randomColorOnHit){ballColor = color(random(0,255), random(0,255), random(0,255));}
	} 
	if(ballX>=width-ballSize/2)
	{ // right wall hit
		ballDirection=-1;
		if(randomColorOnHit){ballColor = color(random(0,255), random(0,255), random(0,255));}
	} 

	ballY += speed;
	ballX += ballDirection;
	
	if(ballY>=height-30-ballSize/2) // bottom border
	{
		if(ballX-ballSize*2<=mouseX+traySizeX/2 && ballX+ballSize/2>=mouseX-traySizeX/2)
		{ // ball hit the ray
			ballDirection = random(-2,2); // bounce in random direction

			speed = -speed;
			if(randomColorOnHit){ballColor = color(random(0,255), random(0,255), random(0,255));}
		}
		else // game over
		{
			gameOver = true; 
		}
	}
	if(ballY<=0+ballSize/2 + blockSizeY + blockOffset) // ball at blocks height
	{
		for(var i=1; i<=blockCountX; i++)
		{
			if(ballX>=block[i] && ballX<=block[i]+blockSizeX)
			{
				if(blockIsThere[i])
				{ // block hit
					blockIsThere[i] = false;
					if(randomColorOnHit){ballColor = color(random(0,255), random(0,255), random(0,255));}
					score++;
					if(score>=blockCount){gameWon=true;} // all blocks hit, game won
				}
			}
		}
	}
	
	if(ballY<=0+ballSize/2) // top border
	{
		speed = Math.abs(speed);  
		speed += ballSpeedsUpEveryTime;
		if(randomColorOnHit){ballColor = color(random(0,255), random(0,255), random(0,255));}
	}
	
	// tray
	fill(trayColor);
	rect(mouseX - traySizeX / 2, height-30, traySizeX, traySizeY);
	
	// dont allow to move the tray out of canvas
	if(mouseX-traySizeX/2>=size-traySizeX/2){mouseX=width-traySizeX/2;} // right side
	if(mouseX+traySizeX/2<=0+traySizeX/2){mouseX=0+traySizeX/2;} //left side
	
	// other
	textSize(28);
	text(score, width-40, height-8); // points
};

/*
	made by inteNsE- aka RaiZeN
	github.com/inteNs3
*/
