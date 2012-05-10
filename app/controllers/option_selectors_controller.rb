class OptionSelectorsController < ApplicationController
  respond_to :json

  def index
    OptionSelector.all.to_json
  end

end
