'use strict';

function Drawer( context, radius, depth, alfa, beta )
{
	const lineSolid = [ ];
	const lineDash = [ 5, 5 ];
	
	var tmp = Math.sin( beta );
	
	function transform( action )
	{
		context.save();
	
		context.scale( scale, scale );
		context.rotate( alfa );
		context.translate( -radius, 0.0 );
		
		if( action )
			action();
			
		context.restore();
	}

	this.drawScreen = function()
	{
		context.save();
		
		context.lineJoin = 'round';
		context.lineCap = 'round';
	
		transform( function()
		{
			var side = 3.0 * tmp;
	
			context.beginPath();
			context.moveTo( 3.0, -side );
			context.lineTo( 0.0, 0.0 );
			context.lineTo( 3.0, +side );
			
			context.globalAlpha = 0.2;
			context.fillStyle = '#FDFDC3';
			context.fill();
		} );

		context.setLineDash( lineDash );

		context.lineWidth = 2.0;
		context.strokeStyle = '#FCDEA2';
		context.stroke();
		
		transform( function()
		{
			context.beginPath();
			context.moveTo( 0.0, 0.0 );
			context.lineTo( 3.0, 0.0 );
		} );
	
		context.lineWidth = 0.5;
		context.strokeStyle = '#000';
		context.stroke();
		
		transform( function()
		{
			var side = depth * tmp;
	
			context.beginPath();
			context.moveTo( depth, -side );
			context.lineTo( depth, +side );
		} );

		context.setLineDash( lineSolid );
		
		context.lineWidth = 8.0;
		context.strokeStyle = '#FCA8A2';
		context.stroke();
		
		context.restore();
	};
	
	this.drawPoint = function( offset, radius )
	{
		context.save();
		
		context.lineJoin = 'round';
		context.lineCap = 'round';
	
		transform( function()
		{
			var side = depth * tmp;
	
			context.beginPath();
			context.arc( depth, offset * side, radius / scale, 0.0, 2.0 * Math.PI, false );
			
			context.fillStyle = '#FCDEA2';
			context.fill();
		} );

		context.lineWidth = 1.0;
		context.strokeStyle = '#FF8076';
		context.stroke();
		
		context.restore();
	};
}