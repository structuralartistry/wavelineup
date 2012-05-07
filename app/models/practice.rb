class Practice < ActiveRecord::Base
  has_many :identities
  has_many :invoices
  has_many :accounting_transactions
  has_many :option_selector_options

  attr_accessible :name, :referring_practice_id, :time_zone
end
