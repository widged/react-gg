/* jshint esnext: true */

import Polar from '../../lib/Polar';

export default class GeomPolarPie {

    static layout(aesthetics, space, options) {

        var radial         = aesthetics.x;
        var angular        = aesthetics.y;

        var originTheta = space.originTheta || 0;
        
        return function(d, i) {
            var h = radial.scaleFn(d);
            var triangleAngle = Polar.radiansFromDegrees(angular.scale(1)) / 2;
            var baseW = Math.tan(triangleAngle) * h;
            var rotate = originTheta + (angular.scale(i)) + 90;
            var lines = [[0, 0], [h, baseW], [h, -baseW]];
            return {rotate: rotate, lines: lines };
        };

    }
    
}
