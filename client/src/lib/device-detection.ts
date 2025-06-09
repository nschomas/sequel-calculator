interface DeviceInfo {
  browser: string;
  device: string;
  os: string;
  userAgent: string;
}

export async function getDeviceInfo(): Promise<DeviceInfo> {
  try {
    // Use UAParser.js for more accurate device detection
    const { UAParser } = await import('ua-parser-js');
    const parser = new UAParser();
    const result = parser.getResult();
    
    return {
      browser: result.browser.name || 'Unknown',
      device: result.device.type || 'desktop',
      os: result.os.name || 'Unknown',
      userAgent: navigator.userAgent
    };
  } catch (error) {
    // Fallback to basic detection if UAParser fails
    const userAgent = navigator.userAgent;
    
    let browser = 'Unknown';
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';
    
    let device = 'desktop';
    if (/Mobi|Android/i.test(userAgent)) device = 'mobile';
    else if (/Tablet|iPad/i.test(userAgent)) device = 'tablet';
    
    let os = 'Unknown';
    if (userAgent.includes('Windows')) os = 'Windows';
    else if (userAgent.includes('Mac')) os = 'macOS';
    else if (userAgent.includes('Linux')) os = 'Linux';
    else if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('iOS')) os = 'iOS';
    
    return {
      browser,
      device,
      os,
      userAgent
    };
  }
}

export async function getIPAddress(): Promise<string> {
  try {
    const response = await fetch('/api/ip');
    const data = await response.json();
    return data.ip || 'unknown';
  } catch (error) {
    console.error('Failed to get IP address:', error);
    return 'unknown';
  }
}
