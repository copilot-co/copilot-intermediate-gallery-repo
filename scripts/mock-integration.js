#!/usr/bin/env node
/**
 * Mocks an outbound Slack/Teams-style notification for this repo's PR workflow.
 *
 * No real webhook URL or credentials are required to run this script — it
 * only ever writes a local JSON file describing what *would* be sent.
 */

/*
> [!NOTE]
> In production this step would `POST` the payload below to a real Slack
> incoming webhook (or Teams connector) URL, e.g.:
>   curl -X POST -H 'Content-Type: application/json' \
>     --data @mock-integration-output.json "$SLACK_WEBHOOK_URL"
> To make it real: add a `SLACK_WEBHOOK_URL` repository secret, swap the
> `writeFileSync` call below for a `fetch()`/`curl` POST to that secret, and
> remove the "(mock)" prefix from the message text.
*/

const fs = require('fs');
const path = require('path');

function buildMockMessage() {
  const prNumber = process.env.PR_NUMBER || 'N/A';
  const prTitle = process.env.PR_TITLE || 'Untitled pull request';
  const prUrl = process.env.PR_URL || 'https://github.com';
  const actor = process.env.GITHUB_ACTOR || 'unknown-user';
  const repo = process.env.GITHUB_REPOSITORY || 'owner/repo';

  return {
    channel: '#gallery-app-releases',
    username: 'Photo Gallery Bot (mock)',
    icon_emoji: ':camera:',
    text: `(mock) :rocket: *${actor}* opened PR #${prNumber} in \`${repo}\``,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*(mock) New pull request*\n<${prUrl}|#${prNumber}: ${prTitle}>`,
        },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `Author: ${actor} | Repo: ${repo} | Generated: ${new Date().toISOString()}`,
          },
        ],
      },
    ],
  };
}

function main() {
  const message = buildMockMessage();
  const outputPath = path.join(process.cwd(), 'mock-integration-output.json');
  fs.writeFileSync(outputPath, JSON.stringify(message, null, 2) + '\n');
  console.log(`Wrote mock Slack/Teams payload to ${outputPath}`);
  console.log(
    'NOTE: this is a mock only — no real webhook was called. See the header comment in this file for how to make it real.'
  );
}

main();
