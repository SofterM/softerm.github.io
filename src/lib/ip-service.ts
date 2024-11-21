export async function getVisitorIP(): Promise<string> {
    try {
      // ใช้บริการ ipify API เพื่อดึง IP address
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Error fetching IP:', error);
      return 'unknown'; // กรณีเกิดข้อผิดพลาด
    }
  }