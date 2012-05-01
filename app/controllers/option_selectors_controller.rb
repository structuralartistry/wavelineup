class OptionSelectorsController < ApplicationController
  respond_to :json

  def index
    OptionSelector.all.to_json
#    @option_selectors = OptionSelector.all
  end

end
