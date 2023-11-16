use serde::ser::{Serialize, Serializer, SerializeStruct};

pub struct Message {
    pub body: BroadcastSubscribeBody,
    pub method: String,
    pub route: String
}

pub struct BroadcastSubscribeBody {
    pub subscribe_address: String,
    pub publish_address: String
}

impl Serialize for BroadcastSubscribeBody {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut state = serializer.serialize_struct("BroadcastSubscribeBody", 2)?;
        state.serialize_field("subscribeAddress", &self.subscribe_address)?;
        state.serialize_field("publishAddress", &self.publish_address)?;
        state.end()
    }
}

impl Serialize for Message {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut state = serializer.serialize_struct("Message", 3)?;
        state.serialize_field("body", &self.body)?;
        state.serialize_field("type", &self.method)?;
        state.serialize_field("route", &self.route)?;
        state.end()
    }
}