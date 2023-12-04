// pages/api/latent-consistency.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Replicate from 'replicate';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end(); // Only allow POST requests
    return;
  }

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  try {
    const { prompt } = req.body;
    console.log('Received prompt:', prompt); // Log received fields

    const output = await replicate.run(
      "fofr/latent-consistency-model:a83d4056c205f4f62ae2d19f73b04881db59ce8b81154d314dd34ab7babaa0f1",
      { input: { prompt } }
    );

    res.status(200).json(output);
  } catch (error) {
    console.error('Error with Replicate API:', error);
    res.status(500).json({ error: 'Error calling Replicate API' });
  }
}
