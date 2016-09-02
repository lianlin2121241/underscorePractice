(function($, _, Config, window, document, undefined) {

  if(!window._isAwesome) {
    window._isAwesome = {};
  }

  window._isAwesome.Filter = (function() {

    var filtersConfig = Config.getFilters(),
        filters = [],

        getFilterValues = function(items, filterConfig) {
          return _.chain(items)
                  /**
                    返回一个封装的对象. 在封装的对象上调用方法会返回封装的对象本身, 直道 value 方法调用为止.
                   */
                  .pluck(filterConfig.field)
                  /**
                    var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
                    _.pluck(stooges, 'name');
                    => ["moe", "larry", "curly"]
                   */
                  .flatten()
                  /**
                    _.flatten([1, [2], [3, [[4]]]]);
                    => [1, 2, 3, 4];
                   */
                  .compact()
                  /**
                    返回一个除去所有false值的 array副本。 在javascript中, false, null, 0, "", undefined 和 NaN 都是false值.
                   */
                  .value();
                  /**
                    var stooges = [{name: 'curly', age: 25}, {name: 'moe', age: 21}, {name: 'larry', age: 23}];
                    var youngest = _.chain(stooges)
                      .sortBy(function(stooge){ return stooge.age; })
                      .map(function(stooge){ return stooge.name + ' is ' + stooge.age; })
                      .first()
                      .value();
                    => "moe is 21"
                   */
        };

    return {
      
      getFilters: function(items) {
        _.each(filtersConfig, function(filterConfig) {
          filters.push(_.extend(filterConfig, {
            values: getFilterValues(items, filterConfig)
          }))
        });

        return filters;
      }
    }

  })();

})(jQuery, _, _isAwesome.Config, window, document);