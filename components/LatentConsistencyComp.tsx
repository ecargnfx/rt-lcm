import Image from 'next/image';
import { useState, FormEvent } from 'react';

const LatentConsistencyComp = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/latent-consistency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      console.log('Sending prompt:', prompt); // Log prompt
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Failed to make prediction');
        return;
      }
      setOutput(data);
    } catch (err) {
      setError('Failed to make prediction');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt"
        />
        <button type="submit">Predict</button>
      </form>

      {error && <div>Error: {error}</div>}
      {output.length > 0 && (
        <div>
          <h3>Result:</h3>
          <Image 
            src={output[0]} 
            alt="Generated Output" 
            width={960} // Adjust as needed
            height={540} // Adjust as needed
            layout="responsive"
          />
        </div>
      )}
    </div>
  );
};

export default LatentConsistencyComp;
