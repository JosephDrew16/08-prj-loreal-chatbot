// Copy this code into your Cloudflare Worker script.
export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    };

    // Handle browser preflight requests.
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: corsHeaders
      });
    }

    const apiKey = env.OPENAI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Worker secret OPENAI_API_KEY is not configured' }), {
        status: 500,
        headers: corsHeaders
      });
    }

    const userInput = await request.json();
    if (!Array.isArray(userInput.messages)) {
      return new Response(JSON.stringify({ error: 'A messages array is required' }), {
        status: 400,
        headers: corsHeaders
      });
    }

    const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4.1',
        messages: userInput.messages,
        max_completion_tokens: 300
      })
    });

    const responseBody = await openAiResponse.text();
    return new Response(responseBody, {
      status: openAiResponse.status,
      headers: corsHeaders
    });
  }
};
