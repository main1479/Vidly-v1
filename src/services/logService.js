// import * as Sentry from '@sentry/react';
// import { Integrations } from '@sentry/tracing';

function init() {
	// Sentry.init({
	// 	dsn: 'https://c79f1f41d878417194111938e038fdf9@o815704.ingest.sentry.io/5807132',
	// 	release: 'my-project-name@' + process.env.npm_package_version,
	// 	integrations: [new Integrations.BrowserTracing()],
	// 	tracesSampleRate: 1.0,
	// });
};

function log(error) {
	// Sentry.captureException('Logging the error', error);
	console.error(error)
}

const logService = {
	init,
	log,
};

export default logService;
