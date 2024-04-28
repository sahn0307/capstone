// pages/api/v1/profile.js
export default async function handler(req, res) {
    if (req.method === 'GET') {
      const { authorization } = req.headers;
  
      if (!authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      try {
        const response = await fetch('http://localhost:5555/api/v1/profile', {
          headers: {
            Authorization: authorization,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          res.status(200).json(data);
        } else {
          res.status(response.status).json({ message: 'Failed to fetch user profile' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }