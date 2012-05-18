class OptionSelectorOption < ActiveRecord::Base
  has_many :accounting_categories, :class_name => 'AccountingTransaction', :foreign_key => :accounting_category_id
  has_many :accounting_accounts, :class_name => 'AccountingTransaction', :foreign_key => :accounting_account_id
  belongs_to :practice
  belongs_to :option_selector

  attr_accessible :option_selector_id, :value, :default_price
end
