class Invoice < ActiveRecord::Base
  has_many :accounting_transactions
  has_many :receivables
  belongs_to :practice
  belongs_to :identity

  attr_accessible :date_time, :identity_id, :identity_write_in, :note, :visit_date_time, :visit_id

  validates :practice_id, :date_time, :presence => true
end
