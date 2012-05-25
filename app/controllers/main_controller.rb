class MainController < ApplicationController

  def index
    @option_selectors_json = OptionSelector.all.to_json

    @option_selector_options_json = OptionSelectorOption.all.to_json

    AccountingTransaction.all.to_json
    @accounting_transactions_json = AccountingTransaction.get_records({ :search       => nil,
                                                                        :page_size    => nil,
                                                                        :page_number  => nil,
                                                                        :practice_id  => 1 }).to_json
  end

end
