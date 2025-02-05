
import { firebaseAnalyticsConfig } from "../FirebaseAnalytics";


export async function  testAnalytics(){
    try {
      firebaseAnalyticsConfig.logEvent({
            name: "select_content",
            params: {
              content_type: "image",
              content_id: "P12453",
              items: [{ name: "Kittens" }],
            },
          });
        
    } catch (error) {
        return error;
    }

  
}
