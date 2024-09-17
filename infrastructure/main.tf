terraform {
  backend "s3" {}
}

data "aws_ssm_parameter" "gitbook_org_id" {
  name = "/connery-plugin/connery-help/v1/gitbook-org-id"
}

data "aws_ssm_parameter" "gitbook_api_key" {
  name = "/connery-plugin/connery-help/v1/gitbook-api-key"
}

data "aws_ssm_parameter" "feedback_slack_webhook_url" {
  name = "/connery-plugin/connery-help/v1/feedback-slack-webhook-url"
}

data "aws_ssm_parameter" "bug_report_slack_webhook_url" {
  name = "/connery-plugin/connery-help/v1/bug-report-slack-webhook-url"
}


module "deploy-plugin-on-aws-lambda" {
  source = "github.com/connery-io/deploy-plugin-on-aws-lambda?ref=v0.2.0"

  plugin_name    = "connery-help"
  plugin_version = "v1"

  environment_variables = {
    GITBOOK_ORG_ID = data.aws_ssm_parameter.gitbook_org_id.value
    GITBOOK_API_KEY = data.aws_ssm_parameter.gitbook_api_key.value
    FEEDBACK_SLACK_WEBHOOK_URL = data.aws_ssm_parameter.feedback_slack_webhook_url.value
    BUG_REPORT_SLACK_WEBHOOK_URL = data.aws_ssm_parameter.bug_report_slack_webhook_url.value
  }
}