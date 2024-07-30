import { ReportHandler } from 'web-vitals';

<<<<<<<<<<<<<  ✨ Codeium AI Suggestion  >>>>>>>>>>>>>>
/**
 * Reports web vitals metrics to the provided `onPerfEntry` function.
 *
 * @param {ReportHandler | undefined} onPerfEntry - The function to receive the web vitals metrics.
 * @return {Promise<void>} A promise that resolves when the web vitals metrics are reported.
 */
<<<<<  bot-c17c9b64-6c9c-4d61-b207-bdb9967088b0  >>>>>
const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
