Wavelineup.Models.Base = Backbone.Model.extend({
    initialize: function(){
        this.on('change', function(){
            var i, changedAttributes = this.changedAttributes() || [];
            _.each(this.attributes, function(value, key){
                if( _.isFunction(value) && _.isArray(value.attributes) ) {
                    for(i in value.attributes) {
                        if ( _.has(changedAttributes, value.attributes[i]) ) {
                            this.trigger("change:"+key);
                            return ;
                        }
                    }
                }
            }, this);
        }, this);
    },
    get: function(attr) {
        var value = Backbone.Model.prototype.get.call(this, attr);
        if (typeof value === "function") {
            return value.call(this);
        } else {
            return value;
        }
    },
    toJSON: function() {
        var data = {},
            json = Backbone.Model.prototype.toJSON.call(this);
        _.each(json, function(value, key) {
            if(typeof value !== 'function') {
                data[key] = value;
            }
        });
        return data;
    },
    to_local_json: function () {
        var data = {},
            json = Backbone.Model.prototype.toJSON.call(this);
        _.each(json, function(value, key) {
            if(typeof value === 'function') {
              data[key] = value.call(this);
            } else {
                data[key] = value;
            }
        });
        return data;
    }
});
