/* jshint esnext: true */

import Polar from '../../lib/Polar';

export default class GeomPolarHat {

    static layout(aesthetics, space, options) {

        var radial         = aesthetics.x;
        var angular        = aesthetics.y;

       var originTheta = space.originTheta || 0;
        var offset = options.offset || 0;
        
        return function(d, i) {
            var h = radial.scaleFn(d);
            var triangleAngle = Polar.radiansFromDegrees(angular.scale(1)) / 2;
            var baseW = 10;
            var rotate = originTheta + 90 + (angular.scale(i));
            var lines = [[0, 0], [-h, baseW], [-h, -baseW]];
            return {rotate: rotate, translate: (h+offset) +", 0",lines: lines };
        };
    }
    
}
