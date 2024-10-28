terraform {
  backend "s3" {}
}

data "aws_ssm_parameter" "gitbook_org_id" {
  name = "/connery-plugin/connery-help/v1/gitbook-org-id"
}

data "aws_ssm_parameter" "gitbook_api_key" {
  name = "/connery-plugin/connery-help/v1/gitbook-api-key"
}

data "aws_ssm_parameter" "linear_api_key" {
  name = "/connery-plugin/connery-help/v1/linear-api-key"
}

module "deploy-plugin-on-aws-lambda" {
  source = "github.com/connery-io/deploy-plugin-on-aws-lambda?ref=v0.2.0"

  plugin_name    = "connery-help"
  plugin_version = "v1"

  environment_variables = {
    GITBOOK_ORG_ID = data.aws_ssm_parameter.gitbook_org_id.value
    GITBOOK_API_KEY = data.aws_ssm_parameter.gitbook_api_key.value
    LINEAR_API_KEY = data.aws_ssm_parameter.linear_api_key.value
  }
}