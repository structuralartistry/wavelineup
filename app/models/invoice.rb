class Invoice < ActiveRecord::Base
  belongs_to :practice
  has_many :accounting_transactions

  attr_accessible :date_time, :identity_id, :identity_write_in, :note, :visit_date_time, :visit_id

  validates :practice_id, :date_time, :presence => true
end
