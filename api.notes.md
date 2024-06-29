page_impressions
page_engaged_users
page_views_total
post_impressions
post_engagements

curl -i -X GET "https://graph.facebook.com/v11.0/{post-id}/insights?metric=post_impressions&access_token={access-token}"

get facebook/{post-id}/insights?metric=post_impressions
get facebook/{post_id}/insights?metric=post_reactions_like_total,post_reactions_love_total,post_reactions_wow_total,post_reactions_haha_total,post_reactions_sorry_total,post_reactions_anger_total&access_token={access-token}