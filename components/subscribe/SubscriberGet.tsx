'use client';
import React, { useEffect, useState } from 'react';

const SubscriberGet = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState<number | string>();

  useEffect(() => {
    const fetchSubscribers = async () => {
      console.log('fetch subs--->');
      setIsLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASIC_URL}/api/subscribers`
        );
        if (!res.ok) {
          throw new Error('Something went wrong');
        }
        const data = await res.json();
        setSubscribers(data.subscribers);
        setTotal(data.total);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!isLoading && !error && (
        <>
          <h2 className="text-center text-2xl font-bold">
            Subscribers - Total: {total}
          </h2>

          <div className="flex justify-center">
            <ul className="my-8 space-y-2 ">
              {subscribers.map((subscriber: SubscriberData) => (
                <li className=" list-item list-disc" key={subscriber._id}>
                  {subscriber.email}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default SubscriberGet;
