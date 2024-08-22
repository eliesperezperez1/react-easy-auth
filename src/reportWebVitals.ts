import { ReportHandler } from 'web-vitals';

/**
 * Reports web vitals metrics to the provided `onPerfEntry` function.
 *
 * @param {ReportHandler | undefined} onPerfEntry - The function to receive the web vitals metrics.
 * @return {Promise<void>} A promise that resolves when the web vitals metrics are reported.
 */
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
