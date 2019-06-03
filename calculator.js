'use strict';

/**
	Dual camera pixel posiotion calculator.
	
	alfa - angle between cameras [rad]
	beta - simgle camera angle of view scope (camera aperture angle) [rad]
	radius - lens distance from point of crossing axes of lenses [m]
	depth - lens distance from obstracle layer (obstracle detection layer distance) [m]
*/
function Calculator( alfa, beta, radius, depth )
{
	var angle = Math.PI - alfa;
	
	var sin = Math.sin( angle );
	var cos = Math.cos( angle );
	
	var side = depth * Math.sin( beta );

	var tmp1 = ( depth - radius ) * cos + radius;
	var tmp2 = ( radius - depth ) * sin;
	var tmp3 = side * sin;
	var tmp4 = side * cos;
	
	var a = { // Screen 2: Point 1
		x : tmp1 - tmp3,
		y : tmp2 - tmp4
	};

	var b = { // Screen 2: Point 2
		x : tmp1 + tmp3,
		y : tmp2 + tmp4
	};

	var c = { // Camera 2
		x : radius * ( 1.0 - cos ),
		y : radius * sin
	};

	var dx = c.x - depth;
	
	var tmp5 = c.x - a.x;
	var tmp6 = b.x - a.x;
	var tmp7 = ( b.y - a.y ) * dx;
	var tmp8 = ( c.y - a.y ) * dx;

	/**
		Transforms first left camera pixel position to right camera pixel position.
	
		value - relative pixel position on left screen (value fome -1 to +1)
		
		return : relative pixel position on right screen (value fome -1 to +1)
	*/
	this.calculate = function( value )
	{
		var dy = c.y - value * side;
		var delta = tmp6 * dy - tmp7;
		
		if( delta == 0.0 )
			return null;
			
		var mi = ( tmp5 * dy - tmp8 ) / delta;
		
		if( mi < 0.0 || mi > 1.0 )
			return null;
			
		return 2.0 * mi - 1.0;
	};
}