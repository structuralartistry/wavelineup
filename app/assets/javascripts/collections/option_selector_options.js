Wavelineup.Collections.OptionSelectorOptions = Backbone.Collection.extend({
  url: '/api/option_selector_options',

  get_by_value: function (option_selector_name, option_selector_option_value) {
    var option_selector_id = Wavelineup.instance.collections.option_selectors.where({name: option_selector_name})[0].get('id');
    return this.where({option_selector_id: option_selector_id, value: option_selector_option_value})[0];
  },

  get_by_key: function (option_selector_name, option_selector_option_key) {
    var option_selector_id = Wavelineup.instance.collections.option_selectors.where({name: option_selector_name})[0].get('id');
    return this.where({option_selector_id: option_selector_id, key: option_selector_option_key})[0];
  },

  get_value_by_key: function (option_selector_name, option_selector_option_key) {
    var option = this.get_by_key(option_selector_name, option_selector_option_key);
    if(option) return option.get('value');
    return '';
  }
});
