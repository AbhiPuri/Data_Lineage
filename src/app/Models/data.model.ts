export interface DataModel {
  //assetClassName: string;
  //edmFieldName: string;
  //edmFieldExName: string;
  //edmFieldDefinition: string;
  //efMandatory: string;
  //normalization: string;
  //derivation: string;
  //chatGptOutput: string;
  //isCustom: string;
  //vendorName: string;
  //vendorFieldName: string;

  ClientName: string,
  ClusterName: string,
  Sub_ClusterName: string,
  CategoryName: string,
  Sub_CategoryName: string,
  Edm_Field_Name: string,
  Edm_Field_Component: string,
  Edm_Field_Export_Name: string,
  edm_field_definition: string,
  edm_field_mandatory: string,
  iscustom: string,
  vendor_name: string,
  vendor_field_name: string,
  scd_field_name: string,
  scd_model_name: string,
  scd_field_definition: string,
  scd_field_mandatory: string,
  scd_field_translation: string,
  scd_field_formula: string,
  scd_chatgpt_output: string,
  cost: number
}
