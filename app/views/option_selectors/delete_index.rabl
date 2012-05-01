collection @option_selectors
attributes :name, 
           :include_blank,
           :include_cancel
child :option_selector_options => :option_selector_option do
  attributes :key, :value
end
