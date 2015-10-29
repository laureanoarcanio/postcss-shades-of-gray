var postcss   = require('postcss');
var converter = require("color-convert")();

module.exports = postcss.plugin('postcss-shades-of-gray', function (opts) {
  opts = opts || {};

  // defaults
  opts.normalizeHexaTo6 = opts.normalizeHexaTo6 || false;
  opts.shades = opts.shades || [];

  // regExp for matching hexa colors
  var hexaColorTest = /#[0-9a-f]{6}|#[0-9a-f]{3}/gi;

  var shortToLongHexa = function(short) {
    if (short.length == 4 && short.indexOf('#') !== -1) {
      var digits = short.split('').map(function(item) {
        if (item !== '#') {
          return item + item;
        } else {
          return item;
        }
      });
      return digits.join('');
    }
    return short;
  };

  var closestColor = function (color, arr) {
    var curr = arr[0];
    var diff = Math.abs (color.r - hexToRgb(curr).r);
    for (var val = 0; val < arr.length; val++) {
      var newdiff = Math.abs (color.r - hexToRgb(arr[val]).r);
      if (newdiff < diff) {
        diff = newdiff;
        curr = arr[val];
      }
    }
    return curr;
  };

  var hexToRgb = function (hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
      } : null;
  };

  var isGray = function(rgb) {
      // if all three components are gray, then it's components should be equal
      if((rgb.r == rgb.g) && (rgb.r == rgb.b)) {
          return true;
      }
      return false;
  };

  // Convert shades to 6 digit hex representation
  opts.shades = opts.shades.map(shortToLongHexa);

  return function (css, result) {
    css.walkDecls(function transformDecl(decl) {
      var matches = decl.value.match(hexaColorTest);
      if (!matches) {
        return;
      }
      matches.forEach(function(color) {
        // convert to RGB
        var longHex = shortToLongHexa(color);
        var asRGB = hexToRgb(longHex);
        if (isGray(asRGB) && opts.shades.length > 0) {
          var closest = closestColor(asRGB, opts.shades);
          decl.value = decl.value.replace(color, closest);
        } else {
          if (opts.normalizeHexaTo6) {
            if (color.length == 4) {
              decl.value = decl.value.replace(color, longHex);
            }
          }
        }
      });
    })
  };
});
