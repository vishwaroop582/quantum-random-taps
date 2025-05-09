
/**
 * Service for interacting with quantum random number generation API
 */

// Using ANU Quantum Random Numbers API
const QUANTUM_API_URL = 'https://qrng.anu.edu.au/API/jsonI.php';

interface QuantumResponse {
  type: string;
  length: number;
  size: number;
  data: number[];
  success: boolean;
}

/**
 * Generates random integers using quantum mechanics
 * 
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @param count - Number of random numbers to generate
 * @returns Array of random quantum numbers
 */
export const generateQuantumRandomNumbers = async (
  min: number = 1,
  max: number = 100,
  count: number = 1
): Promise<number[]> => {
  try {
    // Calculate range and required size based on min/max
    const range = max - min + 1;
    const size = Math.max(32, Math.ceil(Math.log2(range)));
    
    const response = await fetch(`${QUANTUM_API_URL}?length=${count}&type=uint${size}&size=${size}`);
    
    if (!response.ok) {
      throw new Error('Quantum API request failed');
    }
    
    const result: QuantumResponse = await response.json();
    
    if (!result.success) {
      throw new Error('Quantum API returned error');
    }
    
    // Map raw quantum data to requested range
    return result.data.map(value => {
      // Scale the value to fit within min-max range
      return min + Math.floor((value / (Math.pow(2, size) - 1)) * range);
    });
  } catch (error) {
    console.error('Error generating quantum random numbers:', error);
    
    // Fallback to pseudo-random as backup
    console.warn('Falling back to pseudo-random number generation');
    return Array.from({ length: count }, () => 
      Math.floor(Math.random() * (max - min + 1) + min)
    );
  }
};

/**
 * Checks if the quantum API is available
 * 
 * @returns Boolean indicating if the quantum API is reachable
 */
export const checkQuantumApiAvailability = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${QUANTUM_API_URL}?length=1&type=uint8`);
    const result: QuantumResponse = await response.json();
    return result.success === true;
  } catch (error) {
    console.error('Quantum API unavailable:', error);
    return false;
  }
};
