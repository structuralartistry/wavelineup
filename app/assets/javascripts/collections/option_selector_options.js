Wavelineup.Collections.OptionSelectorOptions = Backbone.Collection.extend({
  url: '/api/option_selector_options',

  // association lookups
//  get_by_value: function (option_selector_name, option_selector_option_value) {
//    var option_selector_id = Wavelineup.instance.collections.option_selectors.where({name: option_selector_name})[0].get('id');
//    return this.where({option_selector_id: option_selector_id, value: option_selector_option_value})[0];
//  },


//  get_by_id: function (option_selector_name, option_selector_option_id) {
//    var option_selector_id = Wavelineup.instance.collections.option_selectors.where({name: option_selector_name})[0].get('id');
//    return this.where({option_selector_id: option_selector_id, key: option_selector_option_key})[0];
//  },

  get_value_by_id: function (option_selector_option_id) {
    var option_selector_option = this.where({id: option_selector_option_id})[0];
    if(option_selector_option) return option_selector_option.get('value');
    return '';
  },


//  get_id_by_value: function (option_selector_name, option_selector_option_value) {
//    var option = this.get_by_value(option_selector_name, option_selector_option_value);
//    if(option) return option.get('id');
//    return '';
//  }
});
