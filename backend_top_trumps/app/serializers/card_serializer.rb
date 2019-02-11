class CardSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :url, :attribute_1, :attribute_2, :attribute_3, :attribute_4, :attribute_5
end
