import { NextResponse } from "next/server";
import crypto from "crypto"

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

export async function POST(req) {
    try {
      // Parse the incoming request body as JSON
      const request = await req.json();
      const { public_id } = request;
  
      // Validate the public_id parameter
      if (!public_id) {
        return NextResponse.json(
          { success: false, error: 'public_id is required' },
          { status: 400 }
        );
      }
  
      const timestamp = Math.floor(Date.now() / 1000);
      const signature = crypto
        .createHash('sha1')
        .update(`public_id=${public_id}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`)
        .digest('hex');
  
      // Prepare the data to send in the fetch request
      const data = new URLSearchParams({
        public_id,
        timestamp: timestamp.toString(),
        api_key: process.env.CLOUDINARY_API_KEY,
        signature,
      });
  
      // Send the request to Cloudinary API
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy`,
        {
          method: 'POST',
          body: data,
        }
      );
  
      // Check if the response is OK, otherwise handle errors
      const responseData = await response.json();
  
      if (!response.ok) {
        console.error('Cloudinary error:', responseData);
        return NextResponse.json(
          { success: false, error: 'Failed to delete image' },
          { status: 500 }
        );
      }
  
      // If the operation is successful, return the response data
      return NextResponse.json({ success: true, data: responseData.data });
  
    } catch (error) {
      console.error('Error destroying image:', error);
      return NextResponse.json(
        { success: false, error: 'Internal server error' },
        { status: 500 }
      );
    }
  }

